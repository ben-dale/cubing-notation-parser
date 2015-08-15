window.CubingNotationParser =

	isNumber: (n) -> 
		!isNaN(parseFloat(n)) && isFinite(n)

	getIndexOfLastSubAlgMove: (algorithm) ->
		index = -1
		for move in algorithm
			index++
			if move.indexOf("\)") > -1 then break
		index

	parse: (algorithm) ->
		parsedAlgorithm = []
		algorithmArr = algorithm.split " "
		noOfSkips = 0

		for move, index in algorithmArr
			# Checks if this move has to be skipped or not
			# A move is skipped if it's encapsulated in brackets
			if noOfSkips > 0
				noOfSkips--
			else 
				if move.indexOf("\(") > -1
					# Extract the sub algorithm
					subAlg = algorithmArr.slice(index, algorithmArr.length)
					subAlg = subAlg.slice(0, CubingNotationParser.getIndexOfLastSubAlgMove(subAlg) + 1)
					
					# Number of times to repeat the subalgorithm
					noOfRepeats = subAlg[subAlg.length - 1].split("\)")
					noOfRepeats = noOfRepeats[noOfRepeats.length-1]
					if !noOfRepeats then noOfRepeats = 1

					# Remove brackets and repeating number from sub algorithm
					subAlg[0] = subAlg[0].replace("\(", "")
					subAlg[subAlg.length-1] = subAlg[subAlg.length-1].split(")")[0]

					# Remove spaces from subAlg
					subAlg = subAlg.filter(Boolean)

					# Store subalgorithm in object
					subAlgorithm =
						algorithm : subAlg
						repeat : noOfRepeats

					parsedAlgorithm.push(subAlgorithm)
					noOfSkips += subAlg.length - 1
				else if CubingNotationParser.isNumber(move.substr(move.length - 1))
					subAlgorithm = 
						algorithm : [move.substr(0, move.length - 1)]
						repeat : move.substr(move.length - 1)

					parsedAlgorithm.push(subAlgorithm)
				else
					subAlgorithm = 
						algorithm : [move]
						repeat : 1

					parsedAlgorithm.push(subAlgorithm)
					
		parsedAlgorithm